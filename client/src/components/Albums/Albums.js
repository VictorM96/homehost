import React from "react"
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import AlbumItem from "./AlbumItem/AlbumItem"
import style from "./Albums.module.css"

const Albums = () => {
  const location = useLocation()
  const { data } = location.state

    return (
      <React.Fragment>
      
      <div className={style.Albums}>
        <h1 className={style.Title}>Albums</h1>

        <div className={style.Container}>
          {data && data.map(item => { return <AlbumItem key={item.id} album={item}/> }) }
        </div>
      </div>
      </React.Fragment>
    );
};

// const mapStateToProps = (state) => {
//     return { albums: state.albums.albums, };
// };

export default Albums;