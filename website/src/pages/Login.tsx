import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { loginUser } from '../api/requests';

import TextInput from '../components/TextInput';
import { LoginInputs } from '../components/utils';
import Button from '../components/Button';
import Title from '../components/Title';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import { UserContextType } from '../context/types';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | undefined>(undefined);

  const { token, loginUserWithToken } =
    useContext<UserContextType>(UserContext);

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  const onSubmit = async (loginData: LoginInputs) => {
    const response = await loginUser(loginData);
    if (200 <= response.status && response.status < 300) {
      const { data } = response as { status: number; data: object };
      loginUserWithToken(Object.values(data)[0]);
      navigate('/profile');
    }

    if (400 <= response.status && response.status < 500) {
      const { error } = response as { status: number; error: string };
      setError(error);
    }
  };

  return (
    <div className="m-auto w-[80%] lg:w-[40%] h-full">
      <Title text="User login" />
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
      {error ? <p className="text-red-500">{error}</p> : null}
      <div className="text-end">
        <Link className="underline text-blue-500" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
