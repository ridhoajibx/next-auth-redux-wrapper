import styles from "../../styles/Details.module.css";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroDetails from "../../components/hero/HeroDetails";
import { useSelector, useDispatch } from "react-redux";
import { getHeros } from "../../redux/actions/heroActions";
import { toast } from "react-toastify";
import AddTeam from "../../components/hero/AddTeam";
import React, { useState, useEffect } from "react";
import { heroDefault } from "../../db/heroDetails";



export default function DetailsView() {
    const [heroViewState, setHeroViewState] = useState(heroDefault);
    const { user, isAuthenticated } = useSelector((state) => state.loadedUser);
    const { hero, successDtl, messageDtl } = useSelector((state) => state.detailsHero)
    const errorDtl = useSelector((state) => state.detailsHero.error);
    const { success, message, error } = useSelector((state) => state.newHero);
    const router = useRouter();
    const dispatch = useDispatch();

    //Results from the API Superheroe for the details view
    useEffect(() => {
        successDtl
            ? (setHeroViewState(hero), (toast.success(messageDtl)))
            : (setHeroViewState(heroDefault), (toast.error(messageDtl)), (toast.error(errorDtl)))
    }, [successDtl, errorDtl]);

    //Results of adding a new hero to the Team (Database)
    useEffect(() => {
        success === true ? (toast.success(message)) : (toast.error(error));
    }, [success, message, error]);

    //Update the state of the herosTeam
    useEffect(() => {
        if (isAuthenticated) {
            const user_id = user._id;
            dispatch(getHeros(user_id));// update state of the Team
        }
    }, [isAuthenticated, user]);

    return (
        <Layout title="Details | Website" description="this is the View">
            <div className={styles.container}>
                <div className="container mt-3">
                    <div className="container my-3">
                        <h1 className={styles.title}>Details View</h1>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => router.back()}
                        >
                            GoBack
                        </button>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="card text-center">
                                <div className="card-header card__face--front">
                                    {heroViewState &&
                                        heroViewState.map((hero, index) => (
                                            <h3 className="card-title" key={index}>
                                                {hero.biography.alignment === "good" ? (
                                                    <div>
                                                        <span className={styles.heroName}>{hero.name}</span>{" "}
                                                        is a Superhero
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span className={styles.heroName}>{hero.name}</span>{" "}
                                                        is a Villain
                                                    </div>
                                                )}
                                            </h3>
                                        ))}
                                </div>

                                <div className="card-body card__face--front">
                                    <div className={styles.card__container}>
                                        {heroViewState &&
                                            heroViewState.map((hero, index) => (
                                                <HeroDetails
                                                    key={index}
                                                    hero={hero} />
                                            ))}
                                    </div>

                                    {/* ======================  Card 3  ======================== */}

                                    <div>
                                        <div className="container my-3 mt-5 ">
                                            <h3>Create a Team</h3>
                                            <p>
                                                You can modify your team as many times as you want, you just have to be logged in to create it... Enjoy it..!
                                            </p>
                                        </div>
                                        {heroViewState &&
                                            heroViewState.map((hero, index) => (
                                                <AddTeam
                                                    key={index}
                                                    hero={hero} />
                                            ))}
                                        <button
                                            className="btn btn-primary mx-3 mb-3"
                                            type="button"
                                            onClick={() => router.push('/dashboard')}
                                        >
                                            View Team
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer text-muted card__face--front ">SuperHeroes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <=============== SCROLL UP ===============--> */}
            <Link href='/' >
                <a className="scrollup" id="scroll-up">
                    <i className="ri-arrow-up-fill scrollup__icon"></i>
                </a>
            </Link>
        </Layout>
    );
}
