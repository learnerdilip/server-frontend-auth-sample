import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../api/requests';
import { RegisterInputs } from '../components/utils';
import TextInput from '../components/TextInput';
import FormError from '../components/FormError';
import Button from '../components/Button';
import Title from '../components/Title';

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>(); // react-hook-form

  const [loading, setLoading] = useState(false);

  /**
   * handler for register form submission
   * @param data - form data
   */
  const onSubmit: SubmitHandler<RegisterInputs> = async (
    data: RegisterInputs,
  ) => {
    setLoading(true); // set loading to true

    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar[0]);
    for (let i = 0; i < data.profilephotos.length; i++) {
      formData.append('profilephotos', data.profilephotos[i]);
    }

    const { status } = await registerUser(formData);
    setLoading(false); // end loading

    if (200 <= status && status < 300) {
      navigate('/register-success');
    }
  };

  /**
   * validation for file size 5MB
   * @param e - event
   */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size >= 1024 * 1024 * 5) {
      setError('avatar', {
        type: 'manual',
        message: 'Maximum file size is 10MB',
      });
    }
  };

  const handleProfilePhotosChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length < 4) {
      setError('profilephotos', {
        type: 'manual',
        message: 'You need to upload a minimum of 4 files',
      });
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="m-auto w-[80%] lg:w-[40%] h-full">
      <Title text="User registration" />
      <form
        className="flex flex-col border rounded p-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          placeholder="First Name"
          type="text"
          error={errors.firstName?.message}
          props={register('firstName', {
            required: { value: true, message: 'First name is required' },
            minLength: { value: 2, message: 'First name is too short' },
            maxLength: { value: 25, message: 'First name is too long' },
          })}
        />

        <TextInput
          placeholder="Last Name"
          type="text"
          error={errors.lastName?.message}
          props={register('lastName', {
            required: { value: true, message: 'Last name is required' },
            minLength: { value: 2, message: 'Last name is too short' },
            maxLength: { value: 25, message: 'Last name is too long' },
          })}
        />

        <TextInput
          placeholder="Email"
          type="email"
          error={errors.email?.message}
          props={register('email', {
            pattern: /^\S+@\S+$/i,
            required: { value: true, message: 'Email is required' },
          })}
        />

        <TextInput
          placeholder="Password"
          type="password"
          error={errors.password?.message}
          props={register('password', {
            pattern: {
              value: /(?=.*[0-9])/,
              message: 'Password must contain at least one number',
            },
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password is too short' },
            maxLength: { value: 25, message: 'Password is too long' },
          })}
        />

        <label className={'my-1'} htmlFor="avatar">
          Avatar image
        </label>
        <input
          id="avatar"
          className="my-2"
          type="file"
          {...register('avatar')}
          onChange={handleAvatarChange}
        />

        <label className={'my-1'} htmlFor="profilephotos">
          Profile images (minimum: 4)
        </label>
        <input
          className="my-2"
          id="profilephotos"
          multiple
          type="file"
          {...register('profilephotos', { required: true })}
          onChange={handleProfilePhotosChange}
        />
        {errors.profilephotos && (
          <FormError text={errors.profilephotos?.message} />
        )}

        <Button text="Register" />
      </form>
      <div className="text-end">
        <Link className="underline text-blue-500" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
