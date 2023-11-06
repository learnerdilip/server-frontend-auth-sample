import React from 'react';
import TextInput from '../components/TextInput';
import { useForm } from 'react-hook-form';
import { LoginInputs } from '../components/utils';
import Button from '../components/Button';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = (data: LoginInputs) => {
    console.log(data); // TODO: send data to server
  };

  return (
    <div className="m-auto w-[80%] lg:w-[40%] h-full">
      <form
        className="flex flex-col border rounded p-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          placeholder="Email"
          type="text"
          error={errors.email?.message}
          props={register('email', {
            required: { value: true, message: 'Email is required' },
          })}
        />
        <TextInput
          placeholder="Password"
          type="password"
          error={errors.password?.message}
          props={register('password', {
            required: { value: true, message: 'Password is required' },
          })}
        />
        <Button text="Login" />
      </form>
    </div>
  );
}
