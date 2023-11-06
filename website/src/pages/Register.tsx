import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TextInputs } from '../components/utils';
import TextInput from '../components/TextInput';
import FormError from '../components/FormError';
import Button from '../components/Button';
import Title from '../components/Title';
import { registerUser } from '../api/requests';

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TextInputs>();

  const onSubmit: SubmitHandler<TextInputs> = (data: any) => {
    const formData = new FormData();
    formData.append('firstname', data.firstName);
    formData.append('lastname', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar[0]);
    for (let i = 0; i < data.profilephotos.length; i++) {
      formData.append('profilephotos', data.profilephotos[i]);
    }

    registerUser(formData);
  };

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
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile && selectedFile.size >= 1024 * 1024 * 10) {
              setError('avatar', {
                type: 'manual',
                message: 'Maximum file size is 10MB',
              });
            }
          }}
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
          onChange={(e) => {
            if (e.target.files && e.target.files.length < 4) {
              setError('profilephotos', {
                type: 'manual',
                message: 'You need to upload a minimum of 4 files',
              });
            }
          }}
        />
        {errors.profilephotos && (
          <FormError text={errors.profilephotos?.message} />
        )}

        <Button text="Register" />
      </form>
    </div>
  );
}
