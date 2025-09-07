const ProblemStatement = ({ heading, info, details }) => {
    return (
        <div className="md:w-3/5 w-full space-y-3">
            <h3 className="text-lg font-bold mb-2">{heading}</h3>
            <div>
                {info}
            </div>
            {details && <p className="text-xs font-bold">{details}</p>}
        </div>
    );
};

export default ProblemStatement;
