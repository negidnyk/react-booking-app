import { type FC } from 'react';
import heartIcon from '../../assets/images/heart.svg';


const Footer: FC = () => {
    return (
        <footer className="footer">
      <span className="footer__text">
        © 2026, from{' '}
          <a
              className="footer__link"
              href="https://binary-studio.com"
              target="_blank"
              rel="noreferrer"
          >
          binary studio
        </a>{' '}
          with{' '}
          <img className="footer__icon" src={heartIcon} alt="heart" />
      </span>
        </footer>
    );
};

export { Footer };