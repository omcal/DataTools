
import { createClient } from '@supabase/supabase-js'


// Create a single supabase client for interacting with your database
const supabase = createClient('secret', 'secret')


async function getDataset() {
    return await supabase.from('dataset')
      .select('*')
        .then(({ data, error }) => {
            return data
        }
    )

}
//delete data from supabase with title
export async function deleteData(title) {
    if (checkTitle(title).length === 0) {
        return
    }
    const { data, error } = await supabase
        .from('dataset')
        .delete()
        .eq('title', title)
    return { data, error };

}
//get all titles from supabase
export async function getTitles() {

    const { data, error } = await supabase
        .from('dataset')
        .select('title')
    return { data, error };
}

let test = getDataset().then((data) => data)
async function checkTitle(title) {
    const { data, error } = await supabase
        .from('dataset')
        .select()
        .eq('title', title)
    return data
}
//upload data to supabase
export async function uploadData(params) {
    //if  title exists then don't insert

    if (checkTitle(params.title).length > 0) {
        return
    }
    const { data, error } = await supabase
        .from('dataset')
          .insert([
              params,
            ])
    return { data, error };
}



//upload data to supabase
// async function uploadData() {
//     const { data, error } = await supabase
//         .from('countries')
//           .insert([
//             { name: 'Turkey', myArray: ['TR'] },
//             { name: 'United States', myArray: ['US'] },
//             ])
//     return data
// }
// uploadData().then((data) => console.log(data))
export const categoryList = [
  {
    id: 1,
    value: 'db',
    label: 'Database',
  },
  {
    id: 2,
    value: 'mining',
    label: 'Data Mining',
  },
  {
    id: 3,
    value: 'dv',
    label: 'Data Visualization',
  },
];

export const DataScienceWorkFlowList = [
    {
        id: 1,
        value: '1',
        label: 'Data Access',
    },
    {
        id: 2,
        value: '2',
        label: 'Data Processing',
    },
    {
        id: 3,
        value: '3',
        label: 'Modeling',
    },
    {
        id: 4,
        value: '4',
        label: 'Deployment',
    },
    {
        id: 5,
        value: '5',
        label: 'Monitoring',
    },{
        id: 6,
        value: '6',
        label: 'Storage',
    }

];




//Turkish Note
//typelerin hepsini ufak gir sakin buyuk harf kullanma
//ratingler icin 1-5 arasi bir deger ver yukarida var onu kullan
//price icin 0-100 arasi bir deger ver yukarida var onu kullan
//coverSrc icin resimleri images klasorune at sonra buraya pathini ver
//score icin 1 tane deger ver 0-10 arasi
// LinkToMD icin link ver github readme olabilir
// CommentAbout icin bir yorum ver
// title icin bir baslik ver
// category icin bir kategori ver
// type icin bir type ver
// rating icin bir rating ver
// price icin bir price ver

//ONEMLI
//id icin bir id ver ve her biri unique olsun su an increment sekilde veriyorum
//Database gibi dusun
//sakin ayni id verme



export const dataList = [
  {
    id: 1,
    title: 'Cockroachdb',
    CommentAbout: 'High Available',
    LinkToMD: "https://www.cockroachlabs.com/",
    category: 'db',
    type: ['distributed'],
    rating: 1,
    price: 12,
    coverSrc: '/images/db/Cockroach_Labs_Logo.jpg',
    score:[0,1,2],

  },
  {
    id: 2,
    title: 'Postgresql',
    CommentAbout: 'Hard to scale',
    LinkToMD: "https://www.postgresql.org/",
    category: 'db',
    type: ['document','big-data'],
    rating: 1,
    price: 50,
    coverSrc: 'https://www.postgresql.org/media/img/about/press/elephant.png',
    score:[4,2,1],
  },

  {
    id: 3,
    title: 'Golang',
    CommentAbout: 'New Language it takes 2 weeks to learn',
    LinkToMD: 1.8,
    category: 'mining',
    type: ['human-centric'],
    rating: 2,
    price: 0,
    coverSrc: '/images/dmn/golang.png',
    score:[10,12,13],
  },
  {
    id: 4,
    title: 'Java',
    CommentAbout: 'OOP language It takes 3 months to learn',
    LinkToMD: 3.33,
    category: 'mining',
    type: ['compiled language','easy-to-use'],
    rating: 2,
    price: 0,
    coverSrc: '/images/dmn/java.jpg',
    score:[5,15,7],
  },
  {
    id: 5,
    title: 'Microsoft Power BI',
    CommentAbout: 'Power bi',
    LinkToMD: 3.33,
    category: 'dv',
    type: ['easy-to-use','distributed'],
    rating: 4,
    price: 20,
    coverSrc: '/images/dvs/power-bi.png',
    score:[5.2],
  },
    //Knowledge Seeker
    {
      id: 6,
      title: 'Knowledge Seeker',
      CommentAbout: 'Data Mining',
      LinkToMD: "https://www.altair.com/knowledge-studio/knowledge-seeker-apache-spark/",
      category: 'mining',
      type: ['workshop-based','lightly processed','modular'],
      rating: 3,
      price: 0,

      coverSrc: '/images/dmn/knowledge-seeker.png',
      score:[5.3],

    },
    //Data Mind
    {
        id: 7,
        title: 'Data Mind',
        CommentAbout: 'Data Mining',
        LinkToMD: "https://datamind.global/",
        category: 'mining',
        type: ['workshop-based','lightly processed','modular'],
        rating: 3,
        price: 30,
       coverSrc: '/images/dmn/datamind.png',
        score:[5.6],

    },
    // spss clementine
    {
        id: 8,
        title: 'SPSS Clementine',
        CommentAbout: 'Data Mining',
        LinkToMD: "https://www.ibm.com/products/spss-statistics",
        category: 'mining',
        type: ['workshop-based','lightly processed','modular'],
        rating: 3,
        price: 12,
        coverSrc: '/images/dmn/spss-clementine.png',
        score:[5.7],
    },



];


export function getDataList2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            getDataset()
                .then(data => {
                    const dataList2 = [];
                    for (let i = 0; i < data.length; i++) {
                        dataList2.push(data[i]);
                    }
                    resolve(dataList2);
                })
                .catch(error => reject(error));
        }, 2);
    });
}

// To use the dataList2 array, you can call the getDataList2 function and wait for the Promise to resolve:
// getDataList2()
//     .then(dataList2 => {
//         console.log(dataList2); // or do something else with dataList2
//     })
//     .catch(error => {
//         console.error(error);
//     });

// console.log(dataList)




//for each data in dataList upload to database
// dataList.forEach(data => {
//     uploadData(data).then(() => {
//         console.log("uploaded")
//
//     }).catch((error) => {
//         console.log(error)
//     })
// }
// )