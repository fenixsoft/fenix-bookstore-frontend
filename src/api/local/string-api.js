export default {
  /**
   * 去除HTML标签
   */
  pureText: text => text.replace(/<\/?[^>]*>/g, ''),

  /**
   * 将HTML中的<p></P>转换为回车
   */
  transToReturn: text => text.replace(/<p>/g, '').replace(/<\/p>/g, '\n'),

  /**
   * 将回车转换为<p>
   */
  transToHTML: text => '<p>' + text.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
}
