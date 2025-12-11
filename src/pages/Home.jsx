import React from 'react';
import Banner from '../components/Banner'
import Categories from '../components/Category';
import RecentListings from '../components/RecentListings';
import HomeExtra from '../components/HomeExtra'

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <RecentListings/>
            <HomeExtra/>
        </div>
    );
};

export default Home;