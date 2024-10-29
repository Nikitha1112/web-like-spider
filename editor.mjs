import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/codesample';

tinymce.init({
    selector: '#editor',
    plugins: 'anchor autolink autosave emoticons fullscreen image link media lists table insertdatetime pagebreak preview wordcount searchreplace codesample',
    toolbar: 'undo redo | styleselect | bold italic underline | alignleft alignright aligncenter alignjustify | bullist numlist outdent indent | link image media table',
    menubar: 'edit view format tools help'
});
