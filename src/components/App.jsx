import { useState, useEffect } from 'react';
// import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { getImagesAPI } from "./api/api";
import css from './App.module.css'

const PER_PAGE = 12;

export const App = () =>{
  const [searchWord, setSearchWord] = useState('')
  const [images, setImages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showMoreBtn, setShowMoreBtn] = useState(false)
  const [bigImage, setBigImage] = useState('')
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [isFetch, setIsFetch] = useState(false)


  useEffect(() => {
    if (isFetch) {
      setIsFetch(false);   
      setIsLoading(true);      
      setError(null);
      getImagesAPI(searchWord, page)
          .then(resp => {
            if (!resp.length) {
              setIsEmpty(true);
              setIsLoading(false);
              setShowMoreBtn(false);
              return;
            }
            setImages(prevState => [...prevState, ...resp]);
            if (resp.length >= PER_PAGE) {
              setShowMoreBtn(true);
            }
          }).catch(error => {
            console.log(error.message);
            setError(error.message);
          }).finally(() => {
            setIsLoading(false);
          });
    }
  }, [searchWord, images, showMoreBtn, page, error, isLoading, isEmpty, isFetch]);

  const onSubmit = evt => {
    evt.preventDefault();
    const sw = evt.target.elements[1].value;
    if (sw !== '') {
        setIsFetch(true);
        setSearchWord(sw);
        setPage(1);
        setImages([]);
        setShowModal(false);
        setBigImage('');
        setIsLoading(false);
        setIsEmpty(false);
    };
    };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsFetch(true);
  };
  const onImageClick = evt => {
    setShowModal(true);
    setBigImage(evt.target.dataset.bigimg);
  };
  const onCloseModal = () => setShowModal(false);
  
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
}