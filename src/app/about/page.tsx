import { Main } from '@/components/main';
import { Quote } from '@/components/quote';

const AboutPage = () => {
  return (
    <Main title="About Me">
      <div className="dropcap mb-8">
        <p>
          Hello! I'm <strong>Justin Case</strong>, a passionate full-stack developer with a deep-rooted love
          for crafting elegant code and designing intuitive user experiences. My journey into the world of
          technology began with a fascination for how logic and creativity could intertwine to build impactful
          digital solutions. I thrive on bringing complex ideas to life, transforming abstract concepts into
          functional, user-friendly applications that not only meet but exceed expectations.
        </p>
        <p className="dropcap">
          I believe that the best software is a harmonious blend of robust backend architecture and delightful
          frontend design. My approach is always user-centric, ensuring that every line of code contributes to
          a seamless and engaging experience. I'm a continuous learner, constantly exploring the latest technologies,
          frameworks, and design patterns to stay at the forefront of innovation. When I'm not immersed in code,
          you can find me sketching out new app concepts, exploring the nuances of modern design,
          or contributing to open-source projects.
        </p>
      </div>
      <Quote cite="Steve Jobs">
        <div>Design is not just what it looks like and feels like. Design is how it works.</div>
      </Quote>
    </Main>
  )
}

export default AboutPage;
