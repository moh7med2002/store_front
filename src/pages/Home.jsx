import React from 'react'
import Banner from '../components/Banner'
import Departments from '../components/Departments'
import Layout from '../components/Layout'
import MainHome from '../components/MainHome'
import NewArrival from '../components/NewArrival'
import Sales from '../components/Sales'

export default function Home() {
    return (
        <Layout>
            <MainHome/>
            <Departments/>
            <Banner/>
            <NewArrival/>
            <Sales/>
        </Layout>
    )
}
