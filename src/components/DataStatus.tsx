import { RenderingData } from "../models/rendering_data";

interface DataStatusProps {
    data: RenderingData[];
}

const DataStatus: React.FC<DataStatusProps> = ({ data }) => {
    return (
        <div className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium">
            Data Points: {data.length}
        </div>
    );
};

export default DataStatus;
