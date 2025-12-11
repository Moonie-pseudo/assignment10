import React from 'react';
import Banner from '../components/Banner'
import Categories from '../components/Category';
import RecentListings from '../components/RecentListings';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <RecentListings/>
        </div>
    );
};

export default Home;