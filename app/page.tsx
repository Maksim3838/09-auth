import Image from 'next/image';
import css from './Home.module.css';
import Animated from '@/components/Animated/Animated';

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <div className={css.heroInner}>
          <div className={css.heroLeft}>
            <Animated>
              <p className={css.kicker}>Your personal note space</p>
              <h1 className={css.title}>
                Welcome to <span>NoteHub</span>
              </h1>
            </Animated>

            <Animated delay={0.1}>
              <p className={css.description}>
                NoteHub is a simple and efficient application designed for
                managing personal notes. It helps keep your thoughts organized
                and accessible in one place, whether you are at home or on the
                go.
              </p>
            </Animated>

            <Animated delay={0.2}>
              <p className={css.descriptionSecondary}>
                The app provides a clean interface for writing, editing, and
                browsing notes. With support for keyword search and structured
                organization, NoteHub offers a streamlined experience for anyone
                who values clarity and productivity.
              </p>
            </Animated>
          </div>

          <Animated delay={0.1}>
            <div className={css.heroRight}>
              <Image
                src="/hero-illustration.png"
                alt="Organize your notes visually"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Animated>
        </div>
      </section>
    </main>
  );
}
