import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import SelectField from "../components/SelectFieldRepository";
import LanguageSelect from "../components/LanguageSelect";
import FileUploader from "../components/FileUploader";
import Button from "../components/Button";
import CodeEditor from "../components/CodeEditor";
import ProgressMeter from "../components/ProgressMeter";
import FileStatus from "../components/FileStatus"; 
import "../styles/global.css";

export default function WebForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            repoPath1: "",
            repoPath2: "",
            source_format: "",
            target_format: "",
            source_code: "",
            file_name: "",
        }
    });

    const [sourceCode, setSourceCode] = useState("");
    const [targetCode, setTargetCode] = useState("");
    const [progress, setProgress] = useState(0);
    const [sourceLang, setSourceLang] = useState("");
    const [targetLang, setTargetLang] = useState("");
    const [fileName, setFileName] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState(0);   // ✅ Track uploaded files from API
    const [convertedFiles, setConvertedFiles] = useState(0); // ✅ Track converted files from API

    // ✅ Fetch file status from API on mount
    useEffect(() => {
        const fetchFileStatus = async () => {
            try {
                const response = await fetch("https://api.example.com/file-status");  // ✅ Replace with actual API
                if (!response.ok) {
                    throw new Error("Failed to fetch file status");
                }
                const data = await response.json();
                
                // ✅ Update states
                setUploadedFiles(data.total_uploaded || 0);
                setConvertedFiles(data.total_converted || 0);
            } catch (error) {
                console.error("Error fetching file status:", error);
            }
        };
    
        fetchFileStatus();
        const interval = setInterval(fetchFileStatus, 5000); // ✅ Auto-refresh every 5s
    
        return () => clearInterval(interval);
    }, []);

    // Sync source_code with react-hook-form
    useEffect(() => {
        setValue("source_code", sourceCode);
        setValue("file_name", fileName);
    }, [sourceCode, fileName, setValue]);

    const handleCodeChange = (code) => {
        setSourceCode(code);
        setValue("source_code", code);
    };

    const handleFileUpload = (code, file) => {
        if (file) {
            setSourceCode(code);
            setFileName(file.name);
            setValue("source_code", code);
            setValue("file_name", file.name);
        }
    };
        
    const onSubmit = async (data) => {
        console.log("Form Submitted:", data); // ✅ Corrected reference
        setProgress(50);
    
        try {
            const response = await fetch("https://api.example.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    source_code: sourceCode, // ✅ Ensure it's correctly sent
                    file_name: fileName, // ✅ Corrected reference
                    target_code: targetCode,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
    
            const result = await response.json();
            console.log("Success:", result);
            setTargetCode(`Converted version of: \n${sourceCode}`);
            setProgress(100);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="web-form-container container bg-secondary p-5 rounded shadow-lg w-75">
            <div className="d-flex align-items-center mb-4">
                <img src="/genpactlogo.png" alt="Company Logo" className="img-fluid m-0" />
                <header className="app-header">
                    <h1 className="header-title text-light m-0">Gen-AI Powered Code Migrate</h1>
                </header>
            </div>
            <FileStatus uploadedFiles={uploadedFiles} convertedFiles={convertedFiles} />

            <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className="row g-3">
                    <div className="col-sm-6">
                        <SelectField label="Source Repository" name="repositoryType1" register={register} options={["AWS", "GitHub", "Bitbucket"]} />
                    </div>
                    <div className="col-sm-6">
                        <SelectField label="Target Repository" name="repositoryType2" register={register} options={["AWS", "GitHub", "Bitbucket"]} />
                    </div>
                    <div className="col-sm-6">
                        <InputField label="Source Path" name="repoPath1" register={register} errors={errors} />
                    </div>
                    <div className="col-sm-6">
                        <InputField label="Target Path" name="repoPath2" register={register} errors={errors} />
                    </div>
                    <div className="col-sm-6">
                        <LanguageSelect label="Source Language" name="source_format" value={sourceLang} onChange={setSourceLang} register={register} errors={errors} />
                    </div>
                    <div className="col-sm-6">
                        <LanguageSelect label="Target Language" name="target_format" value={targetLang} onChange={setTargetLang} register={register} errors={errors} />
                    </div>
                </div>
                <div className="converter-wrapper mt-4 p-4 bg-light rounded">
                    <div className="editor-section">
                        <h4>Source Code</h4>
                        <FileUploader onFileUpload={handleFileUpload} />
                        <CodeEditor
                            label="Source Code"
                            name="source_code"
                            isSource={true}
                            code={sourceCode}
                            setCode={handleCodeChange}
                            language={sourceLang}
                        />
                    </div>
                    <div className="text-center my-3">
                        <Button type="submit" className="btn btn-primary w-100">Convert Code</Button>
                        <ProgressMeter progress={progress} />
                    </div>
                    <div className="editor-section">
                        <h4>Converted Code</h4>
                        <CodeEditor
                            label="Converted Code"
                            name="target_code"
                            isSource={false} // Read-only
                            code={targetCode}
                            setCode={setTargetCode}
                            language={targetLang}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
