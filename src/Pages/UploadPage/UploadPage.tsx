import React, {useRef, useState} from 'react';
import axios from 'axios';
import { Button, CircularProgress, Box, Paper, Typography, Alert, AlertTitle } from '@mui/material';
import { ErrorOutline, CheckCircleOutline, CloudUpload, Clear } from '@mui/icons-material';
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
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    textAlign: 'center',
                    background: '#f7fafc',
                    borderRadius: '16px',
                    border: '2px dashed #cbd5e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: '#667eea',
                        background: '#edf2f7'
                    }
                }}
            >
                <CloudUpload sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3748' }}>
                    Upload Replay Files
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#718096' }}>
                    Select a .zip file containing your .ggr replay files (Max 250MiB)
                </Typography>
                <form ref={formRef}>
                    <Button
                        component="label"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6b4295 100%)'
                            }
                        }}
                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            accept="application/x-zip-compressed"
                            onChange={onFileSelect}
                            disabled={isLoading}
                        />
                    </Button>
                </form>
                {file && typeof file !== 'string' && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#2d3748', fontWeight: 600 }}>
                        Selected: {(file as File).name}
                    </Typography>
                )}
            </Paper>
        );
    }

    const renderSubmitButton = () => {
        return (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                    onClick={onSubmit}
                    disabled={file === '' || statusMessage.isError}
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5568d3 0%, #6b4295 100%)',
                            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                        },
                        '&:disabled': {
                            background: '#cbd5e0',
                            color: '#a0aec0'
                        }
                    }}
                >
                    Upload file
                </Button>
                <Button
                    onClick={onFileClear}
                    disabled={file === ''}
                    variant="outlined"
                    startIcon={<Clear />}
                    sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderColor: '#e2e8f0',
                        color: '#718096',
                        '&:hover': {
                            borderColor: '#cbd5e0',
                            background: '#f7fafc'
                        },
                        '&:disabled': {
                            borderColor: '#e2e8f0',
                            color: '#cbd5e0'
                        }
                    }}
                >
                    Clear
                </Button>
            </Box>
        );
    }

    const renderSpinner= () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, minHeight: '60px' }}>
                {isLoading && <CircularProgress sx={{ color: '#667eea' }} size={48} />}
            </Box>
        );
    }

    const renderStatusMessage = () => {
        if (Object.keys(statusMessage).length > 0) {
            return (
                <Box sx={{ mt: 3, maxWidth: '600px', mx: 'auto' }}>
                    <Alert
                        severity={statusMessage.isError ? 'error' : 'success'}
                        icon={statusMessage.isError ? <ErrorOutline /> : <CheckCircleOutline />}
                        sx={{
                            borderRadius: '12px',
                            '& .MuiAlert-message': {
                                fontWeight: 600
                            }
                        }}
                    >
                        {statusMessage.message}
                    </Alert>
                </Box>
            )
        }
    }

    return (
        <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#2d3748', textAlign: 'center' }}>
                Upload Replays
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#718096', textAlign: 'center', maxWidth: '700px', mx: 'auto' }}>
                Share your replay files with the community. Upload a .zip file containing your .ggr replay files and they will be added to the database.
            </Typography>
            {renderUploadInput()}
            {renderSubmitButton()}
            {renderStatusMessage()}
            {renderSpinner()}
        </Box>
    )
}