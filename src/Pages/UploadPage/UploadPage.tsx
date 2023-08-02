import React, {useRef, useState} from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import { ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import '../../App.css';

const isSuccessResponse = (status) => {
    return String(status)[0] === '2';
}

export const UploadPage = (props) => {
    const [file, setFile] = useState<string | Blob>('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<any>({});

    const formRef = useRef(null);

    const onSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);
        
        const getUrl = 'https://api.frameone.net/upload-zip';
        
        const getRequest: any = await axios(
            getUrl
        );

        if (!isSuccessResponse(getRequest.status)) {
            setIsLoading(false);
            setStatusMessage({
                isError: true,
                message: 'Failed to obtain signed post request from S3'
            });
            return;
        }

        const {data} = getRequest;

        const postUrl = data.result;
        
        const config = data.fields;

        const formData = new FormData();
        formData.append('Content-Type', 'multipart/form-data');
        formData.append('policy', config.Policy);
        formData.append('bucket', config.bucket);
        formData.append('key', config.key);
        formData.append('x-amz-signature', config['X-Amz-Signature']);
        formData.append('x-amz-security-token', config['X-Amz-Security-Token']);
        formData.append('x-amz-algorithm', config['X-Amz-Algorithm']);
        formData.append('x-amz-credential', config['X-Amz-Credential']);
        formData.append('x-amz-date', config['X-Amz-Date']);
        formData.append('file', file);

        const postRequest = await axios.post(postUrl, formData, config);

        setFile('');
        setIsLoading(false);
        formRef.current.reset();

        if (!isSuccessResponse(postRequest.status)) {
            setStatusMessage({
                isError: true,
                message: 'Failed to upload file to S3'
            });
        } else {
            setStatusMessage({
                isError: false,
                message: 'File successfully uploaded'
            });
        }

    }

    // To do:
    // Add a date column
    // Add size validation on upload

    const onFileSelect = e => {
        const file = e.target.files[0];
        if (file.name.split('.').pop() !== 'zip') {
            setStatusMessage({
                isError: true,
                message: 'Improper file format. Upload a .zip file'
            });
        } else if (file.size < 1000) {
            setStatusMessage({
                isError: true,
                message: 'Improper file size. Minimum size is 1 Kilobyte'
            });
        } else if (file.size > 262144000) {
            setStatusMessage({
                isError: true,
                message: 'Improper file size. Maximum size is 250MiB'
            });
        }
        else {
            setStatusMessage({});
        }
        setFile(file);
    }

    const onFileClear = () => {
        setFile('');
        setStatusMessage({});
        formRef.current.reset();
    }

    const renderUploadInput = () => {
        return (
            <div className='container' style={{paddingLeft: '55px'}}>
                <form ref={formRef}>
                    <input
                        type="file"
                        ref={formRef}
                        accept="application/x-zip-compressed" 
                        onChange={onFileSelect} 
                        disabled={isLoading}
                    />
                </form>
            </div>
        );
    }
    
    const renderSubmitButton = () => {
        return (
            <div className='container'>
                <Button onClick={onSubmit} disabled={file === '' || statusMessage.isError}>
                    Upload file
                </Button>
                <Button onClick={onFileClear} disabled={file === ''}>
                    Clear
                </Button>
            </div>
        );
    }
    
    const renderSpinner= () => {
        return (
            <div className='spinner-container'>
                {isLoading && <CircularProgress />}
            </div>        
        );
    }
    
    const renderStatusMessage = () => {
        if (Object.keys(statusMessage).length > 0) {
            return (
                <div className='container flex-container'>
                    <div style={{width: '5%'}}>
                        { statusMessage.isError ? <ErrorOutline /> : <CheckCircleOutline />}
                    </div>
                    <div style={{width: '30%'}}>
                        { statusMessage.message}
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className='section-label'>
                Upload a zip file:
            </div>
            {renderUploadInput()}
            {renderSubmitButton()}
            {renderStatusMessage()}
            {renderSpinner()}
        </div>
    )
}