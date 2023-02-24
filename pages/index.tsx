import type { NextPage } from 'next'
import styles from './style.module.scss';
import Header from 'components/Header';
import TodoContainer from 'containers/TodoContainer';
import Container from 'components/Container';

const Home: NextPage = () => {
    return (
        <>
            <main className={styles.main}>
                <Header />
                <Container>
                    <TodoContainer className={styles.todoContainer} />
                </Container>
            </main>
        </>
    );
}

export default Home
