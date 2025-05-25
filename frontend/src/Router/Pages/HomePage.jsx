import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../Styles/HomePage.css";

export default function HomePage() {
  const [connectedUser, setConnectedUser] = useState(null);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (path) => (location.pathname === path ? "home-active" : "");

  const getConnectedUser = () => {
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) setConnectedUser(user);
  };

  useEffect(() => {
    getConnectedUser();
  }, []);

  return (
    <>
      <div className="home-app">
        <nav className="home-navbar">
          <div className="home-navbar-container">
            <Link to="/" className="home-navbar-logo">
              Association
            </Link>

            <div className="home-menu-icon" onClick={toggleMenu}>
              <span className={`home-menu-icon-bar ${menuOpen ? "home-open" : ""}`}></span>
              <span className={`home-menu-icon-bar ${menuOpen ? "home-open" : ""}`}></span>
              <span className={`home-menu-icon-bar ${menuOpen ? "home-open" : ""}`}></span>
            </div>

            <ul className={menuOpen ? "home-nav-menu home-active" : "home-nav-menu"}>
              {connectedUser ? (
                <li className="home-nav-item">
                  <button
                    className="home-nav-button"
                    onClick={() => {
                      localStorage.removeItem("connectedUser");
                      setConnectedUser(null);
                      setMenuOpen(false);
                    }}
                  >
                    Déconnexion
                  </button>
                </li>
              ) : (
                <>
                  <li className="home-nav-item">
                    <Link
                      to="/login"
                      className={`home-nav-link ${isActive("/login")}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                  </li>
                  <li className="home-nav-item">
                    <Link
                      to="/register"
                      className={`home-nav-link ${isActive("/register")}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Inscription
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="home-page">
          <section className="home-hero-section">
            <div className="home-hero-content">
              <h1>Bienvenue sur Association</h1>
              <p>
                Connectez-vous avec d'autres, partagez des événements et construisez une communauté
                grâce à nos discussions
              </p>
              <div className="home-hero-buttons">
                {connectedUser ? (
                  <>
                    <Link to="/evenement" className="home-btn home-btn-primary">
                      Explorer les événements
                    </Link>
                    <Link to="/discussion" className="home-btn home-btn-secondary">
                      Rejoindre les discussions
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="home-btn home-btn-primary">
                      Se connecter
                    </Link>
                    <Link to="/register" className="home-btn home-btn-secondary">
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="home-hero-image">
              <div className="home-hero-shape"></div>
            </div>
          </section>

          <section className="home-features-section">
            <h2>Ce que nous offrons</h2>
            <div className="home-features-grid">
              <article className="home-feature-card">
                <div className="home-feature-icon">📅</div>
                <h3>Événements</h3>
                <p>Découvrez et participez à des événements communautaires qui vous intéressent</p>
                <Link to="/evenement" className="home-feature-link">
                  Voir les événements
                </Link>
              </article>

              <article className="home-feature-card">
                <div className="home-feature-icon">💬</div>
                <h3>Discussions</h3>
                <p>Participez à des conversations significatives avec les membres de la communauté</p>
                <Link to="/disscution" className="home-feature-link">
                  Rejoindre les discussions
                </Link>
              </article>

              <article className="home-feature-card">
                <div className="home-feature-icon">👥</div>
                <h3>Communauté</h3>
                <p>Connectez-vous avec des personnes partageant les mêmes idées et construisez des relations</p>
                <Link to="/register" className="home-feature-link">
                  Rejoindre la communauté
                </Link>
              </article>
            </div>
          </section>

          <section className="home-cta-section">
            <h2>Prêt à commencer ?</h2>
            <p>Rejoignez notre communauté dès aujourd'hui et commencez à vous connecter avec les autres</p>
            {connectedUser ? (
              <Link to="/profil" className="home-cta-button">
                Votre profil
              </Link>
            ) : (
              <Link to="/register" className="home-cta-button">
                Créer un compte
              </Link>
            )}
          </section>
        </main>
      </div>
    </>
  );
}