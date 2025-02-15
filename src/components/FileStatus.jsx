import React from "react";
import GaugeChart from "react-gauge-chart";

const FileStatus = ({ uploadedFiles, convertedFiles, confidenceScore }) => {
    return (
        <div className="my-4">
            <div className="row">
                {/* Code Repo Connector */}
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="connector-title bg-red-light">
                                Code Repo Connector
                            </div>
                        </div>
                    </div>
                    <div className="connector-container">
                        <div className="row justify-content-center">
                            {[
                                "/github_logo.svg",
                                "/aws_cloudformation.svg",
                                "/bitbucket_icon.svg",
                            ].map((src, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="box">
                                        <img
                                            src={src}
                                            alt="Connector Logo"
                                            className="connector-logo"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Uploaded Files */}
                {/* <div className="col-md-3 connector">
          <div className="connector-container">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="box">
                  <div className="code-readout">{uploadedFiles}</div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <div className="connector-title">Uploaded Files</div>
              </div>
            </div>
          </div>
        </div> */}

                {/* Converted Files */}
                <div className="col-md-3">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="connector-title bg-green-light">
                                Converted Files
                            </div>
                        </div>
                    </div>
                    <div className="connector-container">
                        <div className="row justify-content-center flex-grow-1">
                            <div className="col-md-4">
                                <div className="box">
                                    <div className="code-readout">
                                        {convertedFiles}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confidence Score */}
                <div className="col-md-3">
                    <div class="row ">
                        <div class="col-md-12">
                            <div class="connector-title bg-primary-light">
                            Analysis of code transformation
                            </div>
                        </div>
                    </div>
                    <div className="connector-container">
                        <div className="row analysis-container">
                            <div className="col-md-12">
                                <GaugeChart
                                    id="gauge-chart3"
                                    nrOfLevels={30}
                                    colors={["#FF5F6D", "#FFC371"]}
                                    arcWidth={0.3}
                                    percent={uploadedFiles ? ((convertedFiles / uploadedFiles) * 100).toFixed(2) : 0}
                                    textColor="#4650dd"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div class="row ">
                        <div class="col-md-12">
                            <div class="connector-title bg-blue-light">
                                Avg Confidence Score
                            </div>
                        </div>
                    </div>
                    <div className="connector-container">
                        <div className="row analysis-container">
                            <div className="col-md-12 text-center">
                                <GaugeChart
                                    id="gauge-chart6"
                                    nrOfLevels={15}
                                    percent={confidenceScore ? (confidenceScore * 100).toFixed(2) : 0}
                                    needleColor="#345243"
                                    textColor="#0d6efd"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileStatus;
