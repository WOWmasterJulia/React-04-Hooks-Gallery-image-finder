import { useState } from 'react';
// import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { getImagesAPI } from "./api/api";
import css from './App.module.css'

const PER_PAGE = 12;

// export class App extends Component {
//   state = {
//     searchWord: '',
//     images: [],
//     showModal: false,
//     showMoreBtn: false,
//     bigImage: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     isEmpty: false,
//   };
export default function App() {
  const [searchWord, setSearchWord] = useState('')
  const [images, setImages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showMoreBtn, setShowMoreBtn] = useState(false)
  const [bigImage, setBigImage] = useState('')
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)


  async componentDidUpdate(_prevProps, prevState) {
    const { searchWord, page } = this.state;
    
    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, error: null });
        
        const resp = await getImagesAPI(searchWord, page);
        // console.log("cdu", resp);
        if (!resp.length) {
          this.setState({
            isEmpty: true,
            isLoading: false,
            showMoreBtn: false,
          });
          return;
        }
        const tmp = this.state.images.concat(resp);
        // console.log(resp);
        this.setState({
          images: tmp,
          showMoreBtn: resp.length >= PER_PAGE,
        });
      } catch (error) {
        console.log(error.message);
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const sw = evt.target.elements[1].value;
    // console.log(sw);
    if (sw !== '') {
      this.setState({
        searchWord: sw,
        page: 1,
        images: [],
        showModal: false,
        bigImage: '',
        isLoading: false,
        isEmpty: false,
      });
    }
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const onImageClick = evt => {
    setImages({ showModal: true });
    setImages({ bigImage: evt.target.dataset.bigimg });
  };
  const onCloseModal = () => setShowModal( false );
  

  // render() {
  //   const { showModal, showMoreBtn, isLoading, isEmpty, bigImage, images } =
  //     this.state;
    // console.log(images);
    return (
      <div className={css.App}>
        <Searchbar myonSubmit={onSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass={css.wrapperClass}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {isEmpty && (
          <p className={css.messageIsEmpty}>
            Sorry. There are no images ... 😭
          </p>
        )}
        {showMoreBtn && <Button onLoadMore={onLoadMore} />}
        {showModal && (
          <Modal onClose={onCloseModal} bigImage={bigImage}></Modal>
        )}
      </div>
    );
  //}
}






// const PER_PAGE = 12;

// export class App extends Component {
//   state = {
//     searchWord: '',
//     images: [],
//     showModal: false,
//     showMoreBtn: false,
//     bigImage: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     isEmpty: false,
//   };
//   async componentDidUpdate(_prevProps, prevState) {
//     const { searchWord, page } = this.state;
    
//     if (prevState.searchWord !== searchWord || prevState.page !== page) {
//       try {
//         this.setState({ isLoading: true, error: null });
        
//         const resp = await getImagesAPI(searchWord, page);
//         // console.log("cdu", resp);
//         if (!resp.length) {
//           this.setState({
//             isEmpty: true,
//             isLoading: false,
//             showMoreBtn: false,
//           });
//           return;
//         }
//         const tmp = this.state.images.concat(resp);
//         // console.log(resp);
//         this.setState({
//           images: tmp,
//           showMoreBtn: resp.length >= PER_PAGE,
//         });
//       } catch (error) {
//         console.log(error.message);
//         this.setState({ error: error.message });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   onSubmit = evt => {
//     evt.preventDefault();
//     const sw = evt.target.elements[1].value;
//     // console.log(sw);
//     if (sw !== '') {
//       this.setState({
//         searchWord: sw,
//         page: 1,
//         images: [],
//         showModal: false,
//         bigImage: '',
//         isLoading: false,
//         isEmpty: false,
//       });
//     }
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };
//   onImageClick = evt => {
//     this.setState({ showModal: true });
//     this.setState({ bigImage: evt.target.dataset.bigimg });
//   };
//   onCloseModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const { showModal, showMoreBtn, isLoading, isEmpty, bigImage, images } =
//       this.state;
//     // console.log(images);
//     return (
//       <div className={css.App}>
//         <Searchbar myonSubmit={this.onSubmit} />
//         <ImageGallery images={images} onImageClick={this.onImageClick} />
//         {isLoading && (
//           <ColorRing
//             visible={true}
//             height="80"
//             width="80"
//             ariaLabel="blocks-loading"
//             wrapperStyle={{}}
//             wrapperClass={css.wrapperClass}
//             colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//           />
//         )}
//         {isEmpty && (
//           <p className={css.messageIsEmpty}>
//             Sorry. There are no images ... 😭
//           </p>
//         )}
//         {showMoreBtn && <Button onLoadMore={this.onLoadMore} />}
//         {showModal && (
//           <Modal onClose={this.onCloseModal} bigImage={bigImage}></Modal>
//         )}
//       </div>
//     );
//   }
// }




// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
