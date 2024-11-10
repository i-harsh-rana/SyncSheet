import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const [content, setContent] = useState('');
  const {docID} = useParams();
  const [deleteConf, setdeleteConf] = useState(false);
  const navigate = useNavigate();
  const [deleteStatus, setDeleleteStatus] = useState(false);
  const [deleteSuccess, setDeleleteSuccess] = useState(false);

  const{data, isLoading, isError, error} = useQuery({
    queryKey : [`/editor/${docID}`],
    queryFn : async()=>{

      const response = await axios.get(`/api/v1/document/openDoc/${docID}`, {
        withCredentials: true
      });

      if(response.status === 200){
        console.log(response.data?.data);
        
        return response.data?.data;
      }else{
        console.error(response);
      }
    }
  })

  useEffect(() => {
    if (data && data.content) {
      setContent(data.content); 
    }
  }, [data]);

  const handleDocDelete = async()=>{
    setDeleleteStatus(true);
    try {
      const response = await axios.delete(`/api/v1/document/deleteDoc/${data._id}`, {
        withCredentials: true
      })

      if(response.status === 200){
        setDeleleteSuccess(true);
        setTimeout(()=>{navigate('/allDocuments');}, 2000)
      }
    } catch (error) {
      setDeleleteStatus(false)
      console.log(error, 'error while deleteing doc!');
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
       { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  if(isLoading){
    return (
      <>
        Loading...
      </>
    )
  }

  if(isError){
    return (
      <>
        {error}
      </>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="font-light flex items-center justify-between">
        <div className='text-2xl font-extralight pl-3'>
          {data?.title}
        </div>
        <div className='flex space-x-3 p-5 items-center'>
          <img
            src={data?.owner?.avatar}
            alt={`${data?.owner?.fullName}'s avatar`}
            className="w-10 h-10 rounded-full object-cover shadow-inner"
          />
          <div className='pr-4'>
            <div className="text-gray-800">
              @{data?.owner?.fullName}
            </div>
            <div className="text-gray-500 text-xs">
              {data?.createdAt.slice(0, 10)}
            </div>
          </div>
          <div>
            <i className="fa-regular fa-trash-can text-xl p-1 opacity-70 hover:text-red-500 active:text-red-700" onClick={()=>setdeleteConf(true)}></i>
          </div>
        </div>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'script',
          'blockquote', 'code-block',
          'list', 'bullet', 'indent',
          'direction', 'align',
          'link', 'image', 'video'
        ]}
        value={content}
        onChange={setContent}
        className="bg-white rounded-lg shadow-md editor-container"
      />
      <style>{`
        .editor-container .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #e5e7eb;
          background-color: #f3f4f6;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 16px;
          padding: 12px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
        }
        .editor-container .ql-toolbar .ql-formats {
          display: flex;
          align-items: center;
          margin-right: 15px;
          margin-bottom: 5px;
        }
        .editor-container .ql-toolbar .ql-picker {
          font-weight: 350;
          font-size: 16px;
        }
        .editor-container .ql-toolbar .ql-picker-label {
          padding: 0 0 12px 0;
          margin: 0 0 0 10px;
        }
        .editor-container .ql-toolbar button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 2px;
        }
        .editor-container .ql-toolbar button svg {
          width: 20px;
          height: 20px;
        }
        .editor-container .ql-toolbar .ql-stroke {
          stroke-width: 1.5px;
        }
        .editor-container .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #e5e7eb;
          min-height: 10rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          padding: 1rem;
        }
        .editor-container .ql-editor {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      `}</style>

      <AnimatePresence>
          {deleteConf && (
              <motion.div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setdeleteConf(false)}
              >
                  <motion.div
                      className="bg-bg-main p-8 rounded-xl w-[30rem]"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className='font-light flex justify-around items-center'>
                      Are you sure? 
                      <motion.button 
                      initial={{x: 20}}
                      animate={{x: deleteStatus ? 150 : 20}}
                      transition={{duration: 0.3, delay: 0.4}}
                        className="hover:text-red-700 flex items-center justify-center hover:bg-red-700/10 px-3 py-2 rounded-xl transition-colors ease-in-out duration-[500ms] overflow-hidden"
                        onClick={handleDocDelete}
                        disabled={deleteStatus}
                      >
                        {deleteSuccess ? (
                          <div className="w-5 flex justify-start items-center overflow-hidden">
                            <motion.div 
                              initial={{ width: 0, y: 20 }}
                              animate={{ 
                                width: deleteSuccess ? 'auto' : 0, 
                                y: deleteSuccess ? 0 : 20  
                              }}
                              transition={{ duration: 0.5, ease: 'linear' }}
                              className="overflow-hidden"
                            >
                              <i className="fa-solid fa-check"></i>
                            </motion.div>
                          </div>
                        ) : (
                          <>
                            Yes
                            {deleteStatus ? (
                              <motion.i 
                                initial={{ scale: 0.2 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                  duration: 0.8, 
                                  ease: "easeInOut", 
                                  repeat: Infinity, 
                                  repeatType: "reverse" 
                                }}
                                className="fa-solid fa-circle ml-3"
                              />
                            ) : (
                              <i className="uil uil-trash-alt pl-2 text-lg"></i>
                            )}
                          </>
                        )}
                      </motion.button>
                      <motion.button 
                      initial={{ opacity: 1, visibility: 'visible' }}  
                      animate={{ 
                        opacity: deleteStatus ? 0 : 1, 
                        visibility: deleteStatus ? 'hidden' : 'visible'  }}
                      className='hover:text-green-700 hover:bg-green-700/10 px-3 py-2 rounded-xl transition-colors ease-in-out duration-[500ms]' 
                      onClick={()=>setdeleteConf(false)}
                      disabled={deleteStatus}>
                        Cancel <i className="pl-2 fa-solid fa-xmark"></i>
                      </motion.button>
                    </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>  
    </div>
  );
};

export default Editor;