import ErrorBoundary from '@/components/Error';
import Editor from './Editor';

const Root = () => {
  return (
    <ErrorBoundary>
      <div className="bg-primary p-4">
        <Editor />
      </div>
    </ErrorBoundary>
  );
};
export default Root;
