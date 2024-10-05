import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/button/BackButton'
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.userPageContainer}>
      <h1>!Lo siento !</h1>
      404 Página no encontrada
      <div className={styles.secctionButton}>
      <BackButton text='← Regresar' onClick={() => navigate('/')}/>
      </div>
    </div>
  )
}
