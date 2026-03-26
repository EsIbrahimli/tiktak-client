
"use client";

import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import styles from './login.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../common/store/authStore';
import Loading from '../../../common/components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
  const router = useRouter();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState({
    name: false,
    phone: false,
    password: false,
  });

  const { loading, token, login, signup } = useAuthStore();

  const normalizePhone = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '');

    if (!digitsOnly) {
      return '';
    }

    if (digitsOnly.startsWith('994') && digitsOnly.length === 12) {
      return `+${digitsOnly}`;
    }

    if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
      return `+994${digitsOnly.slice(1)}`;
    }

    if (digitsOnly.length === 9) {
      return `+994${digitsOnly}`;
    }

    return '';
  }, []);

  useEffect(() => {
    setError('');
    if (!isRegisterMode) {
      setName('');
      setInputError((prev) => ({ ...prev, name: false }));
    }
  }, [isRegisterMode]);

  const markInputsAsError = useCallback((fields: Array<'name' | 'phone' | 'password'>) => {
    setInputError((prev) => {
      const nextState = { ...prev };
      fields.forEach((field) => {
        nextState[field] = true;
      });
      return nextState;
    });

    setTimeout(() => {
      setInputError((prev) => {
        const nextState = { ...prev };
        fields.forEach((field) => {
          nextState[field] = false;
        });
        return nextState;
      });
    }, 3000);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setError('');
      const normalizedPhone = normalizePhone(phone);
      const emptyFields: Array<'name' | 'phone' | 'password'> = [];

      if (!phone.trim()) {
        emptyFields.push('phone');
      }

      if (!password.trim()) {
        emptyFields.push('password');
      }

      if (isRegisterMode && !name.trim()) {
        emptyFields.push('name');
      }

      if (emptyFields.length > 0) {
        markInputsAsError(emptyFields);
      }

      if (!normalizedPhone || !password) {
        setError('Telefon nömrəsi və parol vacibdir');
        return;
      }

      if (!/^\+994\d{9}$/.test(normalizedPhone)) {
        setError('Telefon nomresi +994XXXXXXXXX formatinda olmalidir');
        return;
      }

      if (isRegisterMode) {
        if (!name.trim()) {
          setError('Ad Soyad vacibdir');
          return;
        }

        await signup({
          fullName: name.trim(),
          phone: normalizedPhone,
          password,
        });
        toast.success('Qeydiyyat uğurla tamamlandı');
      } else {
        await login({
          phone: normalizedPhone,
          password,
        });
        toast.success('Daxil olma uğurlu oldu');
        router.push('/landingPage');
      }

      setName('');
      setPhone('');
      setPassword('');
      setInputError({ name: false, phone: false, password: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string | string[] }>;
      const message = axiosError.response?.data?.message;

      if (Array.isArray(message) && message.length > 0) {
        setError(message[0]);
        return;
      }

      if (typeof message === 'string') {
        setError(message);
        return;
      }

      setError('Əməliyyat uğursuz oldu');
    }
  }, [isRegisterMode, login, markInputsAsError, name, normalizePhone, password, phone, router, signup]);

  useEffect(() => {
    if (token) {
      setError('');
    }
  }, [token]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} closeOnClick />
      {loading ? (
        <Loading fullScreen />
      ) : (
    <div className={styles.loginContainer}>
        <div className={styles.loginImageContainer}>
            <h1 className={styles.loginTitle}>TIK TAK</h1>
            <Image className={styles.loginImage} src="/icons/login.svg" alt="Login Image" width={1200} height={1200}/>
        </div>
        
         <div className={styles.loginForm}>
          <div className={styles.loginFormPanel}>
            <div className={styles.loginFormHeader}>
                  <button
                    type="button"
                    className={`${styles.loginLink} ${!isRegisterMode ? styles.activeTab : ''}`}
                    onClick={() => setIsRegisterMode(false)}
                  >
                    Daxil ol
                  </button>
                  <button
                    type="button"
                    className={`${styles.registerLink} ${isRegisterMode ? styles.activeTab : ''}`}
                    onClick={() => setIsRegisterMode(true)}
                  >
                    Qeydiyyatdan keç
                  </button>
            </div>
          <div className={styles.loginFormBody}>
            {isRegisterMode && (
              <>
                <label>Ad Soyad</label>
                <input
                  type="text"
                  placeholder='Ad Soyad'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputError.name ? styles.inputError : ''}
                />
              </>
            )}
            <label >Telefon nömrəsi</label>
            <input
              type="tel"
              placeholder='(+994) __ / ___ / __ / '
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputError.phone ? styles.inputError : ''}
            />
             <label>Parol</label>
            <input
              type="password"
              placeholder='*************'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputError.password ? styles.inputError : ''}
            />
             <button className={styles.formInput} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Gözləyin...' : isRegisterMode ? 'Qeydiyyatdan keç' : 'Daxil ol'}
             </button>
             {error && <p>{error}</p>}
             <p>
              {isRegisterMode ? 'Hesabın var?' : 'Hesabın yoxdursa'}
              <button
                type="button"
                className={styles.registerHere}
                onClick={() => setIsRegisterMode((prev) => !prev)}
              >
                {isRegisterMode ? 'Daxil ol' : 'Qeydiyyatdan keç'}
              </button>
             </p>
          </div>
          </div>
           </div>
    </div>
      )}
    </>
  );
}