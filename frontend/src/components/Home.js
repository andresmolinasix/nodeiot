import React from 'react'
import { Header } from '.'
import { Link } from 'react-router-dom';
import { Footer } from '.'

const Home = () => {
    return (
        <div>
            <div>
                <Header />
                <section id="what-we-do" className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bg-blue p-5">
                                    <h2 className="display-4 text-white fw-bold">Datos IoT en flujo, decisiones en acción</h2>
                                    <p className="lead text-white mt-3">Integramos tecnología de vanguardia agíl <br />y con experiencia de usuario</p>
                                    <Link to="/registro" className="btn btn-main btn-lg text-black fw-bold">Empieza Ahora</Link>                            </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* team */}
                <section className="team py-5">
                    <div className="container">
                        <h1 className="text-center mb-5">Nuestro Equipo</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-4 text-center">
                                <img src="/Miguel.jpeg" alt="Miguel Gallo" className="rounded-circle mb-3" width="150" height="150" />
                                <h4>Miguel Gallo</h4>
                                <p>Especialista Cloud</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <img src="/Felipe.jpeg" alt="Andres Molina" className="rounded-circle mb-3" width="150" height="150" />
                                <h4>Andres Molina</h4>
                                <p>Líder y Backend</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <img src="/AndreR.jpeg" alt="Andres Molina" className="rounded-circle mb-3" width="150" height="150" />
                                <h4>Andrea Rojas</h4>
                                <p>Desarrolladora bloackchain</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Home