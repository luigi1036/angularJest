import { ReduceTextPipe } from './reduce-text.pipe';

describe('Reduce texte Pipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });
  it('creación Pïpe', () => {
    expect(pipe).toBeTruthy();
  });

  it('uso del transform', () => {
    const text = 'Hola desde el test del pipe';
    const newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5)
  })
});
