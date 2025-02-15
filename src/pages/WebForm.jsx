import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import SelectField from "../components/SelectFieldRepository";
import LanguageSelect from "../components/LanguageSelect";
import FileUploader from "../components/FileUploader";
import Button from "../components/Button";
import CodeEditor from "../components/CodeEditor";
import FileStatus from "../components/FileStatus";
import "../styles/global.css";

export default function WebForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            repoPath1: "",
            repoPath2: "",
            source_format: "",
            target_format: "",
            source_code: "",
            file_name: "",
        },
    });

    const [sourceCode, setSourceCode] = useState("");
    const [targetCode, setTargetCode] = useState("");
    const [progress, setProgress] = useState(0);
    const [sourceLang, setSourceLang] = useState("");
    const [targetLang, setTargetLang] = useState("");
    const [fileName, setFileName] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState(0); // ✅ Track uploaded files from API
    const [convertedFiles, setConvertedFiles] = useState(0);
    const [accuracy, setConfidenceScore] = useState(0); // ✅ Track converted files from API
    const [zipFileUrl, setTargetZipFileUrl] = useState("");

    // ✅ Fetch file status from API on mount

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
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        if (loading) return; // Prevent multiple clicks

        console.log("Form Submitted:", data);
        setProgress(50);
        setLoading(true);

        try {
            const formData = new FormData();
            if (sourceCode) {
                formData.append("source_code", sourceCode);
                formData.append("file_name", fileName);
            }
            formData.append("target_code", targetCode);
            Object.entries(data).forEach(([key, value]) =>
                formData.append(key, value)
            );
            const response = await fetch(
                "https://code-crafter-api-603657590586.us-central1.run.app/convert",
                {
                    method: "POST",
                    mode: "no-cors",
                    body: formData,
                },
                60000
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${await response.text()}`
                );
            }

            const parsedResult = await response.json();
            console.log("Success:", parsedResult);

            setUploadedFiles(parsedResult.total_files ?? 0);
            setConvertedFiles(parsedResult.convertible_files ?? 0);
            if (parsedResult.convertible_files < 1) {
                setConfidenceScore(parsedResult.confidence_score ?? 0);
                setTargetCode(
                    `Converted version of: \n${parsedResult.avg_converted_code}`
                );
                const contentDisposition = parsedResult.headers.get(
                    "Content-Disposition"
                );
                let filename = "converted_files.zip";
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="(.+)"/);
                    if (match && match[1]) {
                        filename = match[1];
                    }
                }
                setTargetZipFileUrl(filename);
            } else {
                setConfidenceScore(parsedResult.confidence_score ?? 0);
                setTargetCode(
                    `Converted version of: \n${parsedResult.converted_code}`
                );
            }

            setProgress(100);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const [selectedRepo, setSelectedRepo] = useState("");
    const handleRepoChange = (event) => {
        setSelectedRepo(event.target.value);
    };
    return (
        <div className="web-form-container container">
            <h3 style={{ color: "#0a58ca" }}>
                <strong>Dashboard</strong>
            </h3>
            <FileStatus
                uploadedFiles={uploadedFiles}
                convertedFiles={convertedFiles}
                confidenceScore={accuracy}
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-100"
                style={{ marginTop: "5rem" }}
            >
                <div className="row g-3">
                    <div className="col-sm-6">
                        <SelectField
                            label="Source Repository"
                            name="repositoryType1"
                            register={register}
                            options={["AWS", "GitHub", "Bitbucket"]}
                        />
                    </div>
                    <div className="col-sm-6">
                        <SelectField
                            label="Target Repository"
                            name="repositoryType2"
                            register={register}
                            options={[
                                "AWS",
                                "GitHub",
                                "Bitbucket",
                                "Local Repo",
                            ]}
                            onChange={handleRepoChange}
                        />
                    </div>
                    <div className="col-sm-6">
                        <InputField
                            label="Source Path"
                            name="repoPath1"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="col-sm-6">
                        <InputField
                            label="Target Path"
                            name="repoPath2"
                            register={register}
                            errors={errors}
                            sourceRepo={selectedRepo === "Local Repo"}
                        />
                    </div>
                    <div className="col-sm-6">
                        <LanguageSelect
                            label="Source Language"
                            name="source_format"
                            value={sourceLang}
                            onChange={setSourceLang}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="col-sm-6">
                        <LanguageSelect
                            label="Target Language"
                            name="target_format"
                            value={targetLang}
                            onChange={setTargetLang}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="bg-primary-light rounded p-3 h-100">
                                    <h4
                                        className="border-bottom pb-1"
                                        style={{
                                            "--bs-border-color": "#4650dd",
                                        }}
                                    >
                                        Source Code
                                    </h4>
                                    <FileUploader
                                        onFileUpload={handleFileUpload}
                                    />
                                    <CodeEditor
                                        label="Source Code"
                                        name="source_code"
                                        isSource={true}
                                        code={sourceCode}
                                        setCode={handleCodeChange}
                                        language={sourceLang}
                                        selectedRepo={selectedRepo}
                                        showDownloadBtn={false}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-primary-light rounded p-3 h-100">
                                    <h4
                                        className="border-bottom pb-1"
                                        style={{
                                            "--bs-border-color": "#4650dd",
                                        }}
                                    >
                                        Converted Code
                                    </h4>
                                    <CodeEditor
                                        label="Converted Code"
                                        name="target_code"
                                        isSource={false} // Read-only
                                        code={targetCode}
                                        setCode={setTargetCode}
                                        language={targetLang}
                                        zipFileUrl={zipFileUrl}
                                        selectedRepo={selectedRepo}
                                        showDownloadBtn={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center my-3">
                                    <Button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            Convert Code {progress}%
                                        </div>
                                        <div
                                            className="progress"
                                            role="progressbar"
                                            aria-label="Default striped example"
                                            aria-valuenow={progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <div
                                                className="progress-bar progress-bar-striped"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
