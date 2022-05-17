import Layout from '../components/layout/Layout';
import Home from '../components/content/Home';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { toast } from 'react-toastify'
import { wrapper } from "../redux/store";
import { getHeros } from "../redux/actions/heroActions";

function HomePage() {
  const { success, message } = useSelector(state => state.user) //

  //Update Profile Success
  useEffect(() => {
    if (success) {
      (toast.success(message))
    }
  }, [success, message])


  return (
    <Layout
      title="Superheroes | HomePage"
      description="this is the Homepage of the website"
    >
      <Home />
      {/* <=============== SCROLL UP ===============--> */}
      <Link href="/">
        <a className="scrollup" id="scroll-up">
          <i className="ri-arrow-up-fill scrollup__icon"></i>
        </a>
      </Link>
    </Layout>

  );
}

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => ({ req }) => {

  return {
    props: {
      initialReduxState: store.getState(req),

    }
  }
})