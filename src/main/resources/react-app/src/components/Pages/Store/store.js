import './store.css';
import Header from '../../Header/header';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Navigation from '../../Header/Navigation/navigation';
import Menu from './mini-components/Menu/menu';
import ItemStoreList from './mini-components/Item-Store-List/item-store-list';

const Store = () => {
    return (
        <div className="container">
            <div className="App">
                <Header/>
                <Title/>
                <Links/>
            </div>
            <Navigation/>
            <div className="App">
                <div className="page9-container">
                    <Menu/>
                    <ItemStoreList/>
                </div>
            </div>
        </div>
    );
}

export default Store;