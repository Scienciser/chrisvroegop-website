import TetchrisBoard from './TetchrisBoard';
import "./TetchrisPage.css";

function TetchrisPage() {
    return (
        <div className="page-tetchris">
            <TetchrisBoard width={10} height={20} />
        </div>
    )
}

export default TetchrisPage;
