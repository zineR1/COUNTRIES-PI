import Home from "../components/Home"
import Paginado from "../components/Paginado";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

configure({ adapter: new Adapter() });

 describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("deberia renderizar 1 componente <Paginado />", () => {
    expect(wrapper.find(Paginado)).toHaveLength(1);
  });

  it('El componente Card deberia recibir como prop name el nombre de un país\"', () => {
    expect(wrapper.contains(<Card name={c.name} />)).toEqual(c.name);
  });

  it("deberia renderizar 1 componente <SearchBar />", () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

});
