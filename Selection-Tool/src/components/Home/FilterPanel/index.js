import React from 'react';
import { categoryList, DataScienceWorkFlowList } from '../SupaBase';
import CheckboxProton from '../../common/CheckboxProton';
import FilterListToggle from '../../common/FilterListToggle';
import SliderProton from '../../common/SliderProton';
import './styles.css';

const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedPrice,
  selectRating,
  type,
  changeChecked,
  changePrice,
}) => (
  <div>
    <div className='input-group'>

    </div>
      <div className='input-group'>
          <p className='label'>Data Science WorkFlow</p>
          <FilterListToggle
              options={DataScienceWorkFlowList}
              value={selectedRating}
              selectToggle={selectRating}
          />
      </div>
      <p className='label'>Technology  Categories</p>
      <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectCategory}

      />
    <div className='input-group'>
      <p className='label'>Type</p>
      {type.map((customType) => (
        <CheckboxProton
          key={customType.id}
          label={customType.label}
          customType={customType}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label-range'>Price Range</p>
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>

  </div>
);

export default FilterPanel;
