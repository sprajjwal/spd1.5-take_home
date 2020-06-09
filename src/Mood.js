import React, { useState } from 'react';

const styles = {
  container : {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    width: '80vw',
    backgroundColor: 'gray',
    height: '100px',
  },
  item: {
    width: "100px",
    height: "96px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px solid gold',
  }
}

function storeMood(newMood) {
  localStorage.setItem("Moods", newMood)
}

function getDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function Mood(props) {
  let localMood = JSON.parse(localStorage.getItem("Moods"));
  localMood = localMood != null ? localMood : {};
  const [moods, setMood] = useState(localMood);
  return(
    <div>
      <div style={styles.container}>
        {Object.keys(moods).map((mood) => {
            return (
            <div style={styles.item}>
              <p>{mood}: {moods[mood].weather} {moods[mood].mood}</p>
            </div>
            )
        })}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const userMood = e.target.elements[0].value
        const payload = {
          weather: props.weather,
          mood: userMood,
        };
        localMood[getDate()] = payload;
        setMood(localMood);
        storeMood(JSON.stringify(localMood));
      }}>
        <input 
        placeholder="Your mood today" />
        <button type="submit">Save my mood for today</button>
      </form>
    </div>
  )
  
}

export default Mood;