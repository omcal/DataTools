import React from 'react';
import './styles.css';
import {DataScienceWorkFlowList} from "../../SupaBase";

/*
const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
};
*/

//hashmap for rating
const tempRating = [1,2,3,4,5];
const ratingMap = new Map();
for (let i = 0; i <DataScienceWorkFlowList.length; i++) {
    ratingMap.set(i+1, DataScienceWorkFlowList[i].label);
}
const ListItem = ({
  item: { coverSrc, title, price, LinkToMD, CommentAbout, rating },
}) => (
  <div className='listItem-wrap'>

    <img src={coverSrc} alt='' />
    <header>
      <h4>{title}</h4>
        <span >{ratingMap.get(rating)}</span>
    </header>
    <footer>
      <p>
    <b>{CommentAbout}</b> <span> <a href={`${LinkToMD}`} target="_blank" rel="noopener noreferrer"> Link </a></span>
      </p>
      <p>
        <b>${price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;
