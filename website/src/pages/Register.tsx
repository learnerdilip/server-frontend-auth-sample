import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TextInputs } from '../components/utils';
import TextInput from '../components/TextInput';
import FormError from '../components/FormError';
import Button from '../components/Button';

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TextInputs>();

  const onSubmit: SubmitHandler<TextInputs> = (data: any) => {
    console.log(data); // TODO: send data to server
  };

  return (
    <div className="m-auto w-[80%] lg:w-[40%] h-full">
      <form
        className="flex flex-col border rounded p-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          placeholder="First Name"
          type="text"
          error={errors.firstname?.message}
          props={register('firstname', {
            required: { value: true, message: 'First name is required' },
            minLength: { value: 2, message: 'First name is too short' },
            maxLength: { value: 25, message: 'First name is too long' },
          })}
        />

        <TextInput
          placeholder="Last Name"
          type="text"
          error={errors.lastname?.message}
          props={register('lastname', {
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
