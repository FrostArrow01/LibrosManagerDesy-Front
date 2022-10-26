export class SearchUtils {

  /**
   * Comprueba si una cadena de texto (target) contiene cualquier palabra de otro texto (text)
   * @param target - Texto en el que buscar
   * @param text - Texto a buscar
   * @param fullWord - Indica si las palabras del texto a buscar deben aparecer enteras
   */
  public static containsAnyWordFrom(target: string, text: string, fullWord?: boolean): boolean {
    let words: string[] = [];
    let includes = false;
    const simplifiedTarget = this.getSimplifiedString(target);

    if (text && text.split(' ').length > 1) {
      words = text.split(' ');
    }
    words.push(text);

    words.forEach(word => {
      if (simplifiedTarget && word) {
        if ((fullWord && simplifiedTarget === this.getSimplifiedString(word))
                || (!fullWord && simplifiedTarget.includes(this.getSimplifiedString(word)))) {
          includes = true;
        }
      }
    });

    return includes;
  }

  /**
   * Convierte a mayúsculas, elimina espacios y reemplaza/elimina caracteres especiales para realizar comparaciones más tolerantes
   * @param str - cadena de entrada
   */
  private static getSimplifiedString(str: string): string {
    let res = str;
    if (str) {
      res = str.toLocaleUpperCase().trim();
      res = res.replace('Á', 'A');
      res = res.replace('É', 'E');
      res = res.replace('Í', 'I');
      res = res.replace('Ó', 'O');
      res = res.replace('Ú', 'U');
      res = res.replace('À', 'A');
      res = res.replace('È', 'E');
      res = res.replace('Ì', 'I');
      res = res.replace('Ò', 'O');
      res = res.replace('Ù', 'U');
      res = res.replace('Ä', 'A');
      res = res.replace('Ë', 'E');
      res = res.replace('Ï', 'I');
      res = res.replace('Ö', 'O');
      res = res.replace('Ü', 'U');
      res = res.replace(',', '');
      res = res.replace('.', '');
      res = res.replace('\'', '');
      res = res.replace('"', '');
    }

    return res;
  }
}
