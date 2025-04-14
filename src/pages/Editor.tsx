import Header from '@/components/Header';
import Editor from '@/components/Editor';
import SideMenu from '@/components/SideMenu';

const EditorPage = () => {
  return (
    <div className="bg-primary h-screen flex flex-col gap-8 max-w-7xl mx-auto mb-8">
      <Header />
      <div className="flex h-full relative">
        <SideMenu />
        <Editor />
        {/* <p className="text-brand-secondary text-xs  font-bold absolute top-[-2rem] left-0 p-2 rounded-md">
          Autoversion in {AUTO_VERSION_DELAY / 1000} seconds
        </p> */}
      </div>
    </div>
  );
};
export default EditorPage;
