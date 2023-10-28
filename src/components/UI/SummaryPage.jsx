import classes from './SummaryPage.module.css';

function SummaryPage({ data }) {
    console.log(data);
    return <h1>{data.title}</h1>
}

export default SummaryPage;