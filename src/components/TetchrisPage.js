import Board from './Board';

export default function TetchrisPage() {
    return (
        <div className="page-tetchris">
            <Board width={10} height={20} />
        </div>
    )
}