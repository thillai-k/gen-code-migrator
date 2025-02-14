import React from "react";
import { CircleCheck, UploadCloud } from "lucide-react"; // ✅ Import icons
import ProgressMeter from "./ProgressMeter";

export default function FileStatus({ uploadedFiles, convertedFiles }) {
    // ✅ Calculate progress percentage
    const uploadProgress = uploadedFiles ? (uploadedFiles / 10) * 100 : 0;
    const conversionProgress = uploadedFiles ? (convertedFiles / uploadedFiles) * 100 : 0;

    return (
        <div className="file-status-container bg-dark text-light p-3 mb-3 rounded">
            <h5 className="mb-2">File Processing Status</h5>
            
            {/* ✅ Uploaded Files Status */}
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <UploadCloud size={24} className="text-warning me-2" /> {/* ✅ Upload Icon */}
                    <span>Files Uploaded: {uploadedFiles}</span>
                </div>
                <ProgressMeter progress={uploadProgress} />
            </div>

            {/* ✅ Converted Files Status */}
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                    <CircleCheck size={24} className="text-success me-2" /> {/* ✅ Check Icon */}
                    <span>Files Converted: {convertedFiles}</span>
                </div>
                <ProgressMeter progress={conversionProgress} />
            </div>
        </div>
    );
}
