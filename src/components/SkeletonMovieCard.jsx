export default function SkeletonMovieCard() {
    return (
        <div className="w-[150px] md:w[180px] rounded-lg overflow-hidden">
            <div className="h-[225px] md:h-[270px] skeleton rounded-lg mb-2"></div>
            <div className="h-3 w-3/4 skeleton rounded mb-1"></div>
            <div className="h-3 w-1/2 skeleton rounded"></div>
        </div>
    )
}