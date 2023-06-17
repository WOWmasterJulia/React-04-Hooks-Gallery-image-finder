import PropTypes from 'prop-types';
import css from './Button.module.css'

// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими. Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. Если массив изображений пуст, кнопка не рендерится.
export const Button = ({onLoadMore}) => (
    <button className={css.Button} type="button" onClick={onLoadMore}>Load more</button>
)

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}