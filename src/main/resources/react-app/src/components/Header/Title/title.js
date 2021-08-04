import TitleCSS from './title.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

const Title = () => {
    return (
        <section className="title" style={TitleCSS}>
            <div>
                <h1>Raku</h1>
                <h1>tech</h1>
            </div>
            <nav>
                <FontAwesomeIcon icon={faBars}/>
            </nav>
        </section>
    );
}

export default Title;