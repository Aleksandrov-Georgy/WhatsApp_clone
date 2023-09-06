import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { fetchRegistrationCheck, getId, getApi } from '../../Store/Slice/getLoginSlice';
import { setUserDataID, setUserDataAPI } from '../../Store/Slice/listMessageSlice';
import { BiLoaderAlt } from 'react-icons/bi';

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [api, setApi] = React.useState('');

  const loader = useSelector((state) => state.login.loader);
  const error = useSelector((state) => state.login.error);

  const Registration = () => {
    dispatch(getId(id));
    dispatch(getApi(api));
    dispatch(setUserDataID(id));
    dispatch(setUserDataAPI(api));

    dispatch(fetchRegistrationCheck({ id, api }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        {error ? (
          <h3 className={styles.error}>
            Данные введены не корректно,
            <br /> попробуйте еще раз
          </h3>
        ) : (
          <h2>Регистрация</h2>
        )}
        <div className={styles.loginBox_input}>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="Введите idInstance"
          />
          {id && (
            <AiOutlineCloseCircle className={styles.loginBox_input_svg} onClick={() => setId('')} />
          )}
        </div>
        <div className={styles.loginBox_input}>
          <input
            value={api}
            onChange={(e) => setApi(e.target.value)}
            type="text"
            placeholder="Введите apiToken"
          />
          {api && (
            <AiOutlineCloseCircle
              className={styles.loginBox_input_svg}
              onClick={() => setApi('')}
            />
          )}
        </div>
        <button disabled={loader && true} type="button" onClick={() => Registration()}>
          {loader ? <BiLoaderAlt className={styles.loader} /> : 'Войти'}
        </button>
        <a href="https://console.green-api.com/">Регистрация</a>
      </div>
    </div>
  );
};

export default Login;
