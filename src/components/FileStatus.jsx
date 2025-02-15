import React from "react";

const FileStatus = ({ uploadedFiles, convertedFiles, confidenceScore }) => {
  return (
    <div className="main">
      <div className="row monitor-container">
        
        {/* Code Repo Connector */}
        <div className="col-md-3 connector">
          <div className="container connector-container">
            <div className="row justify-content-center">
              {["/github_logo.svg", "/aws_cloudformation.svg", "/bitbucket_icon.svg"].map((src, index) => (
                <div className="col-md-4" key={index}>
                  <div className="box">
                    <img src={src} alt="Connector Logo" className="connector-logo" />
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <div className="connector-title">Code Repo Connector</div>
              </div>
            </div>
          </div>
        </div>

        {/* Converted Files */}
        <div className="col-md-3 connector">
          <div className="container connector-container">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="box">
                  <div className="code-readout">{convertedFiles}</div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <div className="connector-title">Converted Files</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="col-md-3 connector">
          <div className="container connector-container">
            <div className="row analysis-container">
              {["/meter_group.svg", "/meter_group.svg"].map((src, index) => (
                <div className="col-md-4" key={index}>
                  <div className="box">
                    <img src={src} alt="Meter Icon" className="connector-logo" />
                  </div>
                  <div className="connector-sub-title">
                  {index === 0 
  ? `Analysis of code transformation: ${uploadedFiles ? ((convertedFiles / uploadedFiles) * 100).toFixed(2) + "%" : "0%"}` 
  : `Avg Confidence Score: ${confidenceScore ? (confidenceScore * 100).toFixed(2) + "%" : "0%"}`}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FileStatus;
