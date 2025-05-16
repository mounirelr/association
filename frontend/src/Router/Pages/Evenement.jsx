import "../../Styles/evenement.css";
import important from "../../important.jpg";
import CreateEventCard from "../../Components/CreateEventCard";
export default function Evenement() {


  




  return (
    <div className="eventManagement">
      {/* Add Event Section */}
      <CreateEventCard />

      {/* Event List Section */}
      <section className="eventManagement__listSection">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Événements à venir</h2>
          <div className="sectionHeader__filter">
            <select className="filterSelect">
              <option>Tous les événements</option>
              <option>Cette semaine</option>
              <option>Cette mois</option>
            </select>
          </div>
        </div>

        <div className="eventGrid">
          {/* Event Card 1 */}
          <div className="eventCard">
            <div className="eventCard__badge">Featured</div>
            <img src={important} alt="Event" className="eventCard__image" />
            <div className="eventCard__content">
              <div className="eventCard__date">May 25, 2023 • 2:00 PM</div>
              <h3 className="eventCard__title">Tech Conference 2023</h3>
              <p className="eventCard__description">
                Join industry leaders for a day of cutting-edge technology discussions and networking opportunities.
              </p>
              <div className="eventCard__meta">
                <span className="eventCard__location">Convention Center</span>
                <span className="eventCard__spots">32 spots left</span>
              </div>
              <div className="eventCard__buttons">
                <button className="eventCard__button eventCard__button--register">Register Now</button>
                <button className="eventCard__button eventCard__button--more">More Info</button>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="eventCard">
            <img src={important} alt="Event" className="eventCard__image" />
            <div className="eventCard__content">
              <div className="eventCard__date">June 10, 2023 • 6:30 PM</div>
              <h3 className="eventCard__title">Art Exhibition Opening</h3>
              <p className="eventCard__description">
                Experience the latest contemporary art from emerging local artists with live music and refreshments.
              </p>
              <div className="eventCard__meta">
                <span className="eventCard__location">City Art Gallery</span>
                <span className="eventCard__spots">Limited capacity</span>
              </div>
              <div className="eventCard__buttons">
                <button className="eventCard__button eventCard__button--register">Register Now</button>
                <button className="eventCard__button eventCard__button--more">More Info</button>
              </div>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="eventCard">
            <div className="eventCard__badge">New</div>
            <img src={important} alt="Event" className="eventCard__image" />
            <div className="eventCard__content">
              <div className="eventCard__date">June 15, 2023 • 9:00 AM</div>
              <h3 className="eventCard__title">Leadership Workshop</h3>
              <p className="eventCard__description">
                Develop essential leadership skills through interactive sessions with executive coaches.
              </p>
              <div className="eventCard__meta">
                <span className="eventCard__location">Business Center</span>
                <span className="eventCard__spots">15 spots left</span>
              </div>
              <div className="eventCard__buttons">
                <button className="eventCard__button eventCard__button--register">Register Now</button>
                <button className="eventCard__button eventCard__button--more">More Info</button>
              </div>
            </div>
          </div>

          {/* Event Card 4 */}
          <div className="eventCard">
            <img src={important} alt="Event" className="eventCard__image" />
            <div className="eventCard__content">
              <div className="eventCard__date">July 5, 2023 • 7:00 PM</div>
              <h3 className="eventCard__title">Summer Music Festival</h3>
              <p className="eventCard__description">
                Outdoor concert featuring popular bands and food trucks. Bring your friends and enjoy summer nights!
              </p>
              <div className="eventCard__meta">
                <span className="eventCard__location">Riverside Park</span>
                <span className="eventCard__spots">Open to all</span>
              </div>
              <div className="eventCard__buttons">
                <button className="eventCard__button eventCard__button--register">Get Tickets</button>
                <button className="eventCard__button eventCard__button--more">Lineup</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}