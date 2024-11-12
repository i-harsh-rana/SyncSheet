import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Input from '../utils/Input';
import { Link } from 'react-router-dom';
import qs from 'qs';

function AllDocument() {
  const [createFrom, setCreateForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  //get all docs using react query
  const { data: documents = [], isError, isLoading, error } = useQuery({
    queryKey: ['allDocuments'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/v1/document/getAllDocs', {
          withCredentials: true
        });

        return response.data?.data || [];
      } catch (err) {
        console.error('Error fetching documents:', err);
        throw err;
      }
    }
  });

  //create doc function
  const createDoc = async (formData) => {
    try {
      const payload = formData.title ? qs.stringify({ title: formData.title }) : null;
      
      const response = await axios.post('/api/v1/document/createDoc', payload, {
        headers: {
          'Content-Type': payload ? 'application/x-www-form-urlencoded' : undefined
        },
        withCredentials: true
      });

      if (response.status === 200) {
        return response.data?.data;
      }
      throw new Error('Failed to create document');
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  };

  //mutate new data using RQ
  const { mutate } = useMutation({
    mutationFn: createDoc,
    onSuccess: (newData) => {
      queryClient.setQueryData(['allDocuments'], (oldData = []) => {
        return [...oldData, newData];
      });
      reset();
      setCreateForm(false);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='text-main-text flex justify-center p-7'>
      <div className='w-[70rem]'>
        <h3 className='text-2xl font-extralight'>
          All Documents:
        </h3>
        <div className='flex flex-wrap my-7'>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            exit={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCreateForm(true)}
            className='w-[15rem] h-[3rem] my-2 mx-2 border-[0.04rem] rounded-lg border-black/40 flex items-center font-light cursor-pointer'>
            <i className="fa-solid fa-plus text-xl px-3"></i> Create New
          </motion.div>
          {documents && documents.length > 0 && documents.map((doc) => (
            <Link key={doc?._id} to={`/editor/${doc?._id}`}>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                exit={{ scale: 1 }}
                className='w-[15rem] h-[3rem] border-[0.01rem] rounded-lg border-black/40 flex items-center font-light text-main-text my-2 mx-2 p-4 overflow-hidden text-sm'>
                {doc?.title || 'Untitled Document'}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {createFrom && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCreateForm(false)}
          >
            <motion.div
              className="bg-bg-main p-8 rounded-lg w-[30rem]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit((data) => mutate(data))}>
                <Input
                  label='Title :'
                  {...register("title", { required: false })}
                />
                <div className='w-full flex justify-end mt-7'>
                  <motion.button
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    type='submit'
                    className='text-white font-light bg-[#b8860b] text-sm px-6 py-2 rounded-full flex justify-center items-center'
                  >
                    <i className="fa-solid fa-plus pr-2"></i> Create New
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AllDocument;