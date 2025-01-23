'use client'
import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeft, X, Clock } from "lucide-react";
import Link from "next/link";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: "https://s3.filebase.com", // Filebase S3 endpoint
  region: "us-east-1", // Adjust if your bucket is in another region
  accessKeyId: "54AFD87F027EBD66D326", // Replace with your Filebase Access Key
  secretAccessKey: "3OLtQeB0k3CSX1Ja8weJdGAbDabFkbQV2uzbxZat", // Replace with your Filebase Secret Key
});

interface VersionEntry {
  version: number;
  message: string;
  timestamp: string;
}

const scrollbarStyles = `
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #22d3ee #1e293b;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #1e293b;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #22d3ee;
    border-radius: 4px;
    border: 2px solid #1e293b;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #06b6d4;
  }
`;

function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [allUploadsComplete, setAllUploadsComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [versionHistory, setVersionHistory] = useState<VersionEntry[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFiles(acceptedFiles);
      setUploadProgress(new Array(acceptedFiles.length).fill(0));
      setAllUploadsComplete(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    noKeyboard: false,
    multiple: true,
  });

  const simulateFileUpload = (file: File, index: number) => {
    const totalChunks = 100;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      if (progress >= totalChunks) {
        clearInterval(interval);
        setUploadProgress((prev) => {
          const newProgress = prev.map((p, i) => (i === index ? progress : p));
          if (newProgress.every(p => p >= 100)) {
            setAllUploadsComplete(true);
          }
          return newProgress;
        });
      } else {
        setUploadProgress((prev) =>
          prev.map((p, i) => (i === index ? progress : p))
        );
      }
    }, 500);
  };

  const handleSave = async () => {
    try {
      const uploadPromises = uploadedFiles.map((file) => {
        const params = {
          Bucket: "rubix", // Replace with your Filebase bucket name
          Key: file.name,
          Body: file,
          ContentType: file.type,
        };
  
        return s3.upload(params).promise();
      });
  
      const responses = await Promise.all(uploadPromises);
  
      const newVersion: VersionEntry = {
        version: versionHistory.length,
        message: commitMessage || "No commit message",
        timestamp: new Date().toLocaleString(),
      };
  
      setVersionHistory((prev) => [...prev, newVersion]);
      setIsModalOpen(false);
      setCommitMessage("");
      setShowSuccessPopup(true);
  
      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
  
      console.log("Files uploaded successfully:", responses);
    } catch (error) {
      console.error("Error uploading to Filebase:", error);
    }
  };

  const handleShowSuccessPopup = () => {
    setShowSuccessPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  }

  useEffect(() => {
    uploadedFiles.forEach((file, index) => {
      simulateFileUpload(file, index);
    });
  }, [uploadedFiles]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex">
        <style jsx global>
        {scrollbarStyles}
      </style>
      {/* Version History Sidebar */}
      <div className="fixed left-0 top-0 w-[30vw] h-screen bg-zinc-900 border-r border-zinc-700 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Version History</h2>
        {versionHistory.length==0 && (
              <div className="flex items-center justify-center h-[80vh]">
                <p className="text-gray-400">Nothing saved yet</p>
              </div>
            )}
            <div className="space-y-4">
              {versionHistory.map((entry) => (
                <div
                  key={entry.version}
                  className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-cyan-400 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 font-semibold">
                      Version {entry.version}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {entry.timestamp}
                    </div>
                  </div>
                  <p className="text-white text-sm">{entry.message}</p>
                </div>
              ))}
            </div>
          </div>

      {/* Main Content */}
      <div className="ml-[30vw] flex-1 flex flex-col items-center justify-center min-h-screen">
        <Link
          href="/"
          className="top-8 left-[calc(30vw+2rem)] text-white hover:text-cyan-400 transition-colors duration-200 fixed"
        >
          Home
        </Link>

        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-3/4 max-w-2xl border-2 border-dashed border-cyan-400 rounded-lg bg-zinc-800 p-10 cursor-pointer"
        >
          <input ref={inputRef} {...getInputProps()} />
          <p className="text-white text-center">
            {isDragActive
              ? "Drop the folder here..."
              : "Drag and drop a folder here, or click to browse"}
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6 w-3/4 max-w-2xl text-white overflow-y-scroll h-[30vh]">
            <h3 className="text-lg text-cyan-400 font-semibold">Uploaded Folder:</h3>
            <div className="mt-4">
              <p>
                <strong>Total Files Uploaded:</strong> {uploadedFiles.length}
              </p>
              {uploadedFiles.map((file, index) => (
                <div key={index}>
                  <p>
                    <strong>File Name:</strong> {file.name}
                  </p>
                  <p>
                    <strong>File Size:</strong>{" "}
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="mt-2">
                    <p>Upload Progress: {uploadProgress[index]}%</p>
                    <div className="h-2 bg-gray-700">
                      <div
                        className="h-2 bg-cyan-400"
                        style={{ width: `${uploadProgress[index]}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commit Message Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 rounded-lg p-6 w-96 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                Enter Commit Message
              </h3>
              
              <textarea
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full h-32 px-3 py-2 text-white bg-zinc-900 rounded-md border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter your commit message..."
              />
              
              <button
                onClick={handleSave}
                className="mt-4 w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-green-500 text-white rounded-lg p-6 w-96 text-center">
              <h3 className="text-xl font-semibold">Congratulations!</h3>
              <p>Your project has been saved on the cloud.</p>
            </div>
          </div>
        )}

        <div className="fixed right-5 bottom-8 w-[20vw]">
          <div className="flex justify-evenly">
            {allUploadsComplete && (
              <div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-4 ring-1 ring-white/10">
                    <span className="font-bold text-lg">Save</span>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              </div>
            )}
            {versionHistory.length > 0 && (
              <div>
                <button
                onClick={() => handleShowSuccessPopup()}
                className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-4 ring-1 ring-white/10">
                    <span className="font-bold text-lg">Submit</span>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
