import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import {dataList, getDataList2} from '../../components/Home/SupaBase';
import './styles.css';
import Navbar from "../../components/Home/NavigationBar/NavBar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([0, 100]);

    const [dataList2, setDataList2] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDataList2();
                setDataList2(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    //sleep for 1 second
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [customType, setCustomType] = useState([
    { id: 1, checked: false, label: 'Human-Centric' },
    { id: 2, checked: false, label: 'Workshop-based' },
    { id: 3, checked: false, label: 'Neutrally facilitated' },
    { id: 4, checked: false, label: 'Lightly processed' },
    { id: 5, checked: false, label: 'Modular' },
    { id: 6, checked: false, label: 'Scalable' },
    { id: 7, checked: false, label: 'Visual' },

  ]);


    //set to stream ,batch, graph, distributed, relational, document, key-value, time-series

  if (selectedCategory === 'db') {
    if (customType[0].label!=='Distributed'){
        setCustomType([
            { id: 1, checked: false, label: 'Distributed' },
            { id: 2, checked: false, label: 'Relational' },
            { id: 3, checked: false, label: 'Document' },
            { id: 4, checked: false, label: 'Key-value' },
            { id: 5, checked: false, label: 'Time-series' },
            { id: 6, checked: false, label: 'Graph' },
            { id: 7, checked: false, label: 'Stream' },
            { id: 8, checked: false, label: 'Batch' },
            { id: 9, checked: false, label: 'Big-Data' },
            { id: 10, checked: false, label: 'Vector Database' },

        ]);
    }
  }
    if (selectedCategory === 'mining') {
    if (customType[0].label!=='Performance'){
                setCustomType([
                    { id: 1, checked: false, label: 'Performance' },
                    { id: 2, checked: false, label: 'Scalability' },
                    { id: 3, checked: false, label: 'Reliability' },
                    { id: 4, checked: false, label: 'Usability' },
                    { id: 5, checked: false, label: 'Functionality' },
                    { id: 6, checked: false, label: 'Auxiliary Tasks' },
                    { id: 7, checked: false, label: 'General Characteristics' },
                ]);
            }
    }
    if (selectedCategory === 'dv') {
        if (customType[0].label!=='Interactivity'){
        setCustomType([
            { id: 2, checked: false, label: 'Interactivity' },
            { id: 3, checked: false, label: 'Customizability' },
            { id: 4, checked: false, label: 'Export options' },
            { id: 5, checked: false, label: 'Real-time data visualization' },
            { id: 6, checked: false, label: 'Integration with other tools' },
        ]);
        }
    }



  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectCategory = (event, value) =>
      //if you click on the same option twice, it will unselect it
        setSelectedCategory(value === selectedCategory ? null : value);
        if(isLoading){
            sleep(1000).then(() => {
                setIsLoading(false);
            });
        }

        if(selectedCategory==null){
          if (customType[0].label !== 'Human-Centric' && (customType[0].label !== 'Distributed' || customType[0].label !== 'Performance')) {
            setCustomType([
              {id: 1, checked: false, label: 'Human-Centric'},
              {id: 2, checked: false, label: 'Workshop-based'},
              {id: 3, checked: false, label: 'Neutrally facilitated'},
              {id: 4, checked: false, label: 'Lightly processed'},
              {id: 5, checked: false, label: 'Modular'},
              {id: 6, checked: false, label: 'Scalable'},
              {id: 7, checked: false, label: 'Visual'},
            ]);
          }

      }

  const handleSelectRating = (event, value) =>
    setSelectedRating(value === selectedRating ? null : value);

  const handleChangeChecked = (id) => {
    const typeStateList = customType;
    //if customType array includes the id, then set checked to true

    const changeCheckedCustomType = typeStateList.map((item) =>

        item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCustomType(changeCheckedCustomType);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList2;

    // Rating Filter
    if (selectedRating) {
        setSelectedCategory(null);
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
      setSelectedRating(null);
    }


    const customTypeChecked = customType
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());
    if (customTypeChecked.length) {

     //if customTypeChecked array equals the type array, then return the item
        updatedList = updatedList.filter((item) =>
        customTypeChecked.every((type) => item.type.includes(type))
        );


    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }
    //chance score array from string to number
    updatedList = updatedList.map((item) => ({
        ...item,
        score: item.score.map((score) => parseInt(score)),
        }));


    // Sort updatedList to  according to sum of score array descending

    updatedList = updatedList.sort((a, b) =>
      b.score.reduce((acc, cur) => acc + cur, 0) -
      a.score.reduce((acc, cur) => acc + cur, 0)
    );

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();

  }, [selectedRating, selectedCategory, customType, searchInput, selectedPrice,dataList2]);

  return (
      // Add for Navbar to Home page


    <div className='home'>
      {/* Search Bar */}
      <div>
            <Navbar/>
      </div>
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            type={customType}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
          />
        </div>
        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>

    </div>
  );
};

export default Home;
